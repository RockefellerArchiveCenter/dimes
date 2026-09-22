import React, { useEffect } from 'react'
import mirador from 'mirador'

const Viewer = ({ config, plugins }) => {

  useEffect(() => {
    mirador.viewer(config, plugins)
  }, [config, plugins])

  return (<div id={ config.id } />)

}

export default Viewer
