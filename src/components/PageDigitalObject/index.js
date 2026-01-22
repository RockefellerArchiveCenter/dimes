import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  getVisibleCanvases,
  selectInfoResponse,
} from 'mirador';
import { Trans, t } from '@lingui/macro'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import MaterialIcon from '../MaterialIcon'
import { Dropdown, DropdownItem } from '../Dropdown';
import { I18nApp } from '../i18n'
import Viewer from '../Viewer'
import { firePageViewEvent } from '../Helpers'
import './styles.scss'


const PageDigitalObject = ({isMobile}) => {

  const [itemTitle, setItemTitle] = useState("")
  const [manifestUrl, setManifestUrl] = useState("")
  const [downloadUrl, setDownloadUrl] = useState("")
  const { id, type } = useParams()

  /** Fetches and sets item title */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ARGO_BASEURL}/${type}/${id}`)
      .then(res =>  {
        setItemTitle(res.data.title)
        setManifestUrl(res.data.files[0].manifest)
        setDownloadUrl(res.data.files[0].download)
      })
      .catch(err => console.log(err))
    }, [id, type])

  const configs = {
    id: 'mirador',
    selectedTheme: 'rac',
    themes: {
      rac: {
        palette: {
          mode: 'dark',
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
        { manifestId: `${manifestUrl}` }
    ]
  }

  /* Maps Redux state to props for ViewerNavBar */
  const mapStateToProps = (state, { windowId }) => ({
    canvases: getVisibleCanvases(state, { windowId }),
    infoResponse: (canvasId) => selectInfoResponse(state, { windowId, canvasId }) || {},
    foo: state.foo
  });
  

  const ViewerNavBar = (props) => {

    const { canvases, infoResponse, targetProps, TargetComponent} = props;

    /** Constructs url for Back to Item Details link */
    const splitPath = document.referrer && document.referrer.split("?")
    const params = (splitPath && splitPath.length === 2 ) ? `?${splitPath[1]}` : null
    const itemUrl = (
      params ? `/${type}/${id}${params}` : `/${type}/${id}`
    )

    /** Constructs url for single image download */
    const imageDownloadUrl = infoResponse => {
      const imagePath = infoResponse.id && infoResponse.id.split('/').at(-1)
      const downloadUrl = `${process.env.REACT_APP_S3_BASEURL}/images/${imagePath}?response-content-disposition=attachment;filename=${imagePath}.jp2`
      return downloadUrl
    }
  
    return (
      <I18nApp ReactComponent={<div className='viewer-bar'>
      <div className='viewer-bar__title'>
        <TargetComponent {...targetProps} />
      </div>
      <div className='viewer-bar__buttons mt-5 mr-10'>
        <Dropdown
          label={t({
            comment: 'Message shown on download dropdown button',
            message: 'Download'
          })}
          iconBefore='download'
          className='mylist__actions'
          buttonClassName='btn btn--orange btn--sm mr-10'
          listClassName='dropdown__list--orange dropdown__list--slide-down mylist__actions--dropdown'
          role='menu'>
            <DropdownItem
              order={1}
              className='btn--orange dropdown__btn dropdown__item--orange'
              label={t({
                comment: 'Message shown for downloading PDF in digital object viewer',
                message: 'Entire Item - PDF'
              })}
              iconBefore='picture_as_pdf'
              href={downloadUrl}
              role='menuitem' />
            {canvases.map((canvas) => {
              const info = infoResponse(canvas.id)
              const pixelDimensions = info.json && `${info.json.width} x ${info.json.height} px`
              return (
              <DropdownItem
                  key={canvas.id}
                  order={2}
                  className='btn--orange dropdown__btn dropdown__item--orange'
                  label={t({
                    comment: 'Message shown for downloading high-res images in digital object viewer',
                    message: `Current Page - JPEG2000 ${pixelDimensions}`
                  })}
                  iconBefore='image'
                  href={imageDownloadUrl(info)}
                  role='menuitem' />
            )})}
        </Dropdown>
        <Trans comment='Go back to Item details for digital object'>
          <a href={itemUrl} className='btn btn--sm btn--black'>
            <MaterialIcon icon='keyboard_arrow_left' className='material-icon--space-after' />Back to Item Details
          </a>
        </Trans>
      </div>
    </div>} />
    );
  }

  const ViewerNavBarPlugin = {
    target: 'WindowTopBarTitle',
    mode: 'wrap',
    name: 'MiradorDownloadPlugin',
    component: ViewerNavBar,
    mapStateToProps,
  };

  return (
    <>
      <Helmet
        onChangeClientState={(newState) => firePageViewEvent(newState.title)} >
        <title>{ itemTitle }</title>
      </Helmet>
      <div className='viewer'>
        <Viewer config={configs} plugins={[ViewerNavBarPlugin]} />
      </div>
    </>
  )
}

export default PageDigitalObject;
