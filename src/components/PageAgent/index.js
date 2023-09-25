import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import { Helmet } from 'react-helmet'
import PageBackendError from '../PageBackendError'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PageNotFound from '../PageNotFound'
import { AgentAttributeSkeleton, AgentRelatedCollectionsSkeleton } from '../LoadingSkeleton'
import CardList from '../Card'
import AgentAttributeList from '../AgentAttribute'
import '../Button/styles.scss'
import { appendParams, firePageViewEvent } from '../Helpers'
import './styles.scss'
import { Trans, t, Select, select } from '@lingui/macro'

const AgentNote = ({ source, text }) => (
  text ?
  (<div className={'agent__note mb-27'}>
    <Trans comment='Agent note Description'>
      <h3 className='agent-note__label m-0'>Description</h3>
    </Trans>
    <p className='agent-note__value'>
      {text}
    </p>
      <p className='agent-note__source'>
        <Trans comment='Agent Note source'>
          <Select value={source} _null='Source: Rockefeller Archive Center' other={`Source: ${source}`} />
        </Trans>
      </p>
  </div>) : (null)
)

const AgentRelatedCollections = ({ agentTitle, collections, params }) => (
  collections.length ?
  (<div className='agent__related'>
      <h2 className='agent__section-title heading--dotted-border pb-12'>
        <Trans comment='Agent Related Collections'>Collections Related to {agentTitle}</Trans>
      </h2>
    <CardList
      className='card--related-collections'
      hideHitCount
      items={collections}
      params={{...params, query: agentTitle}}/>
    { collections.length === 6 ?
      (<a href={`/search?query=${agentTitle}&category=collection`} className='btn btn--sm btn--orange mt-15 mb-40'><Trans comment='Message to search for more related collections'>Search More Related Collections</Trans></a>) :
      (null)
    }
  </div>) : (null)
)

const AgentSidebar = ({ agentType, externalIdentifiers }) => {
  const linkList = externalIdentifiers.map(i =>  (
    <li key={i.url}>
      <a className='btn btn--md btn--gray btn--agent-identifier mb-10' href={i.url}>{i.title}</a>
    </li>))
  return (
  externalIdentifiers.length ?
  (<div className='agent__sidebar'>
    <Trans comment='Agent Sidebar Header'>
      <h2 className='agent__section-title heading--dotted-border pb-12'>More about this {agentType}</h2>
    </Trans>
    <ul className='list--unstyled'>{linkList}</ul>
  </div>) : (null)
)}

const PageAgent = () => {

  const [backendError, setBackendError] = useState({})
  const [externalIdentifiers, setExternalIdentifiers] = useState([])
  const [found, setFound] = useState(true)
  const [isAgentLoading, setIsAgentLoading] = useState(true)
  const [isAttributesLoading, setIsAttributesLoading] = useState(true)
  const [isCollectionsLoading, setIsCollectionsLoading] = useState(true)
  const [isWikidataLoading, setIsWikidataLoading] = useState(true)
  const [agent, setAgent] = useState({})
  const [collections, setCollections] = useState([])
  const [attributes, setAttributes] = useState({})
  const [narrativeDescription, setNarrativeDescription] = useState('')
  const [narrativeDescriptionSource, setNarrativeDescriptionSource] = useState('')
  const [wikidata, setWikidata] = useState({})
  const [params, setParams] = useState({})
  const { id } = useParams()
  const { search } = useLocation()

  /** Fetches data about collections associated with the agent from the RAC API */
  const fetchCollections = ({ title }) => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/search?query=${title}&category=collection&limit=6`)
      .then(res => {
        setCollections(res.data.results);
        setIsCollectionsLoading(false);
      })
      .catch(err => setBackendError(err))
  }

  /* Fetches data from Wikidata */
  const fetchWikidata = ({ external_identifiers }) => {
    const wikidataId = external_identifiers.find(i => i.source === 'wikidata') && external_identifiers.find(i => i.source === 'wikidata').identifier
    if (wikidataId) {
      axios
        .get(`https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`)
        .then(res => {
          setWikidata(res.data.entities[wikidataId])
        })
        .catch(err => console.log(err))
        .then(res => setIsWikidataLoading(false))
    } else {
      setIsWikidataLoading(false)
    }
  }

  /** Fetches agent data on initial page load */
  useEffect(() => {
    const initialParams = queryString.parse(search, { parseBooleans: true });
    setParams(initialParams)
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/agents/${id}`)
      .then(res => {
        setAgent(res.data);
        fetchCollections(res.data);
        fetchWikidata(res.data);
        setIsAgentLoading(false)
      })
      .catch(err => {
        err.response.status === 404 ? setFound(false) : setBackendError(err) })
  }, [id, search])

  /** Sets agent dates when agent data is available */
  useEffect(() => {
    const agentType = agent.agent_type
    var updatedAttributes = {}
    agent.dates && agent.dates.forEach(date => {
      const beginLabel = t({
        comment: 'Label for the start of the item',
        message: select(agentType, { organization: 'Date Established', other: 'Date of Birth' })
      })
      const endLabel = t({
        comment: 'Label for the end of the item',
        message: select(agentType, { organization: 'Date Disbanded', other: 'Date of Death' })
      })
      updatedAttributes[beginLabel] = date.begin
      updatedAttributes[endLabel] = date.end
    })
    setAttributes(updatedAttributes)
    !isWikidataLoading && !Object.keys(wikidata).length && setIsAttributesLoading(false)
  }, [agent, wikidata, isWikidataLoading])

  /** Sets agent note text when agent notes are updated
  * 1. Fetch extract from Wikipedia if available and no other note exists
  */
  useEffect(() => {
    let noteText = agent.notes && agent.notes.map(note => note.subnotes.map(s => s.content).join('\r\n'))
    if (!noteText && wikidata.sitelinks && wikidata.sitelinks.enwiki) { /* 1 */
      const wikidataTitle = wikidata.sitelinks.enwiki.url.split('/').at(-1)
      axios
        .get(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikidataTitle}`)
        .then(res => {
          setNarrativeDescription(res.data.extract)
          setNarrativeDescriptionSource('Wikipedia')
        })
        .catch(err => console.log(err))
    } else {
      setNarrativeDescription(noteText)
    }
  }, [agent.notes, wikidata])

  /** Parse and set external identifiers found in Wikidata */
  useEffect(() => {
    if (!!Object.keys(wikidata).length) {
      const desiredIdentifiers = [
        { property: 'P214', title: t({ comment: 'External Identifier Title', message: 'Virtual International Authority File' }), prefix: 'https://viaf.org/viaf'} ,
        { property: 'P7859', title: t({ comment: 'External Identifier Title', message: 'WorldCat Identities' }), prefix: 'https://www.worldcat.org/identities' },
        { property: 'P3430', title: t({ comment: 'External Identifier Title', message: 'Social Networks and Archival Context'}), prefix: 'https://snaccooperative.org/ark:/99166' }]
      const availableIdentifiers = desiredIdentifiers.filter(c => Object.keys(wikidata.claims).includes(c.property))
      const parsedIdentifiers = availableIdentifiers.map(c => {
        const identifierValue = wikidata.claims[c.property][0].mainsnak.datavalue.value
        return {title: c.title, url: `${c.prefix}/${identifierValue}`}
      })
      let wikiIdentifiers = [{ title: 'Wikidata', url: `https://wikidata.org/wiki/${wikidata.title }`}]
      wikidata.sitelinks.enwiki && wikiIdentifiers.unshift({ title: 'Wikipedia', url: wikidata.sitelinks.enwiki.url })
      setExternalIdentifiers(wikiIdentifiers.concat(parsedIdentifiers))
    }
  }, [wikidata])

  /** Parse and set agent attributes from Wikidata */
  useEffect(() => {
    const fetchAttributes = async () => {
      const desiredProperties = [
        { property: 'P106', label: t({ comment: 'Occupations property', message: 'Occupations' }) },
        { property: 'P39', label: t({ comment: 'Positions held property', message: 'Positions Held' }) },
        { property: 'P19', label: t({ comment: 'Place of birth property', message: 'Place of Birth' }) },
        { property: 'P112', label: t({ comment: 'Founded by property', message: 'Founded by' }) },
        { property: 'P159', label: t({ comment: 'Location property', message: 'Location of Headquarters' }) },
        { property: 'P1449', label: t({ comment: 'Nicknames property', message: 'Nicknames' }) }
      ]
      const availableProperties = desiredProperties.filter(p => Object.keys(wikidata.claims).includes(p.property))

      await Promise.all(
        availableProperties.map(p => {
          return Promise.all(
            wikidata.claims[p.property].map(c => {
              const identifierValue = c.mainsnak.datavalue.value.id
              if (c.mainsnak.datavalue.type === 'wikibase-entityid') {
                return axios
                  .get(`https://www.wikidata.org/wiki/Special:EntityData/${identifierValue}.json`)
                  .then(res => {
                    return res.data.entities[identifierValue].labels.en.value
                  }
                )
              } else {
                return null
              }
            })
          ).then(v => {
            const valuesList = [...new Set(v)].filter(e => e != null).join(', ')
            setAttributes(a => { return { ...a, [p.label]: valuesList }})
          })
        })
      )
      setIsAttributesLoading(false)
    }

    if (!!Object.keys(wikidata).length) {
      fetchAttributes()
    }
  }, [wikidata])

   /** Constructs the URL for the 'Back to Search' button */
   const searchUrl = (
    params && params.query ? appendParams('/search/', params) : '/'
  )

  if (!found) {
    return (<PageNotFound />)
  }
  if (!!Object.keys(backendError).length) {
    return (<PageBackendError error={backendError} />)
  }
  return (
    <React.Fragment>
      <Helmet
        onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
        <title>{ agent.title }</title>
      </Helmet>
      <div className='container--full-width'>
        <div className='agent__wrapper'>
          <nav className="mt-30">
            <a href={searchUrl} className='btn btn--sm btn--gray'>
              <Trans comment='Back to search button'>
                <span className='material-icon material-icon--space-after'>keyboard_arrow_left</span>Back to Search
              </Trans>
            </a>
          </nav>
          <main id='main' className="mt-60">
            <div className='agent__wrapper--description'>
              <div className='agent__main'>
                <h1 className='agent__title mt-0 mb-30'>{ agent.title || <Skeleton />}</h1>
                  <div>
                    {isAttributesLoading ?
                      (<AgentAttributeSkeleton />) :
                      (<>
                        { !!Object.keys(attributes).length || narrativeDescription ?
                          <Trans comment='summary message'><h2 className='agent__section-title heading--dotted-border pb-12'>Summary</h2></Trans> :
                          null
                        }
                        <AgentAttributeList items={attributes} />
                       </>)}
                    {isAgentLoading ?
                      (<AgentAttributeSkeleton />) :
                      (<AgentNote source={narrativeDescriptionSource} text={narrativeDescription} />)}
                  </div>
                    {isCollectionsLoading ?
                      (<AgentRelatedCollectionsSkeleton />) :
                      (<AgentRelatedCollections
                        agentTitle={agent.title}
                        collections={collections}
                        params={{...params, category: ''}} />) }
                </div>
              <AgentSidebar agentType={agent.agent_type} externalIdentifiers={externalIdentifiers} />
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PageAgent;
