import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import MaterialIcon from '../MaterialIcon'
import Viewer from '../Viewer'
import { firePageViewEvent } from '../Helpers'
import { I18nApp } from '../i18n'
import { Trans, t } from '@lingui/macro'
import './styles.scss'

const PageDigitalObject = ({isMobile}) => {

  const [itemTitle, setItemTitle] = useState("")
  const { id, type } = useParams()

  /** Fetches and sets item title */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${type}/${id}`)
      .then(res =>  {
        setItemTitle(res.data.title)})
      .catch(err => console.log(err))
    }, [id, type])

  const configs = {
    id: 'mirador',
    selectedTheme: 'rac',
    themes: {
      rac: {
        palette: {
          type: 'dark',
          primary: {
            main: '#ffffff'
          },
          secondary: {
            main: '#2F2F2F'
          },
          shades: {
            main: '#000000',
            dark: '#2F2F2F',
            light: '#000000'
          },
          background: {
            paper: '#000000'
          }
        },
        typography: {
          fontFamily: ['Lato', 'sans-serif'],
          body1: {
            color: '#ffffff'
          },
          h3: {
            color: '#ffffff'
          },
          h4: {
            color: '#ffffff'
          },
          overline: {
            color: '#ffffff'
          }
        }
      }
    },
    thumbnailNavigation: {
      defaultPosition: 'off'
    },
    window: {
      allowClose: false,
      allowMaximize: false,
      allowTopMenuButton: false,
      defaultSideBarPanel: 'canvas',
      defaultView: 'single',
      hideWindowTitle: false,
      sideBarOpen: !isMobile,
      panels: {
        info: true,
        attribution: false,
        canvas: true
      }
    },
    workspace: {
      showZoomControls: true
    },
    workspaceControlPanel: {
      enabled: false
    },
    windows: [
        { manifestId: `${process.env.REACT_APP_S3_BASEURL}/manifests/${id}` }
    ]
  }

  const splitPath = document.referrer && document.referrer.split("?")
  const params = (splitPath && splitPath.length === 2 ) ? `?${splitPath[1]}` : null

  /** Constructs url for Back to Item Details link */
  const itemUrl = (
    params ? `/${type}/${id}${params}` : `/${type}/${id}`
  )

  /** Custom top bar which includes additional classes  so we can style things as we want to **/
  const CustomTopBarTitle = ({ TargetComponent, targetProps  }) => (
    <I18nApp ReactComponent={<div className='viewer-bar'>
      <div className='viewer-bar__title'>
        <TargetComponent {...targetProps} />
      </div>
      <div className='viewer-bar__buttons mt-5 mr-10'>
        <Trans comment='Download button for digital object'>
          <a className='btn btn--sm btn--orange'
            href={`${process.env.REACT_APP_S3_BASEURL}/pdfs/${id}`}
            target='_blank'
            title={t({
              comment: 'Title for new window button',
              message: 'opens in a new window'
            })}
            rel='noopener noreferrer'
          ><MaterialIcon icon='get_app' /> Download</a>
        </Trans>
        <Trans comment='Go back to Item details for digital object'>
          <a href={itemUrl} className='btn btn--sm btn--black'>
            <MaterialIcon icon='keyboard_arrow_left' className='material-icon--space-after' />Back to Item Details
          </a>
        </Trans>
      </div>
    </div>} />
  )

  /** Adds CustomTopBarTitle to Mirador plugins */
  const plugins = [
    {
      mode: 'wrap',
      component: CustomTopBarTitle,
      target: 'WindowTopBarTitle'
    }
  ]

  return (
    <>
      <div>
        TESTING THIS IS A TEST
      </div>
      <Helmet
        onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
        <title>{ itemTitle }</title>
      </Helmet>
      <div className='viewer'>
        <Viewer config={configs} plugins={plugins} />
      </div>
    </>
  )
}

export default PageDigitalObject;
