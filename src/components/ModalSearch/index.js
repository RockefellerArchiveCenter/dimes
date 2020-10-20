import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "../Button";
import CollectionHits from "../CollectionHits";
import Facet from "../Facet";
import { CheckBoxInput, YearInput } from "../Inputs";
import MaterialIcon from "../MaterialIcon";
import "./styles.scss"


export const FacetModal = props => {
  var [startYear, setStartYear] = useState(0);
  var [endYear, setEndYear] = useState(0);

  useEffect(() => {
    const startDate = (props.params.start_date__gte ? props.params.start_date__gte : (props.data.min_date && props.data.min_date.value)) || "";
    const endDate = (props.params.end_date__lte ? props.params.end_date__lte : (props.data.max_date && props.data.max_date.value)) || "";
    setStartYear(startDate);
    setEndYear(endDate);
  }, [props.params.start_date__gte, props.params.end_date__lte, props.data.min_date, props.data.max_date] );

  return (
    <Modal
      appElement={props.appElement ? props.appElement : Modal.setAppElement("#root")}
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      className="modal-content--facet"
      overlayClassName={{
        base: "modal-overlay--facet slide--right",
        afterOpen: "slide--right--after-open",
        beforeClose: "slide--right--before-close"
      }}
      closeTimeoutMS={200} >
      <div className="modal-header--search">
        <h2 className="modal-header__title">Filter Search Results</h2>
        <button className="modal-header__button" aria-label="Close" onClick={props.toggleModal}>
          <MaterialIcon icon="close"/>
        </button>
      </div>
      <div className="modal-body">
        <Facet>
          <CheckBoxInput
            id="online"
            name="true"
            className="facet__input checkbox--blue"
            checked={props.params.online === "true"}
            handleChange={e => props.handleChange(e, "online")}
            label={`Show me digital materials only (${props.data.online && props.data.online.doc_count})`} />
        </Facet>
        <Facet title="Date Range">
          <YearInput
            id="startYear"
            label="Start Year"
            className="hide-label"
            handleChange={e => {setStartYear(e.target.value)}}
            value={startYear} />
          <YearInput
            id="endYear"
            label="End Year"
            className="hide-label"
            handleChange={e => {setEndYear(e.target.value)}}
            value={endYear} />
          <Button className="btn--sm btn--blue" label="apply" handleClick={() => {props.handleDateChange(startYear, endYear)}}/>
        </Facet>
        <Facet
          handleChange={props.handleChange}
          items={props.data.format}
          paramKey="genre"
          params={props.params.genre}
          title="Format" />
        <Facet
          handleChange={props.handleChange}
          items={props.data.creator}
          paramKey="creator"
          params={props.params.creator}
          title="Creator" />
        <Facet
          handleChange={props.handleChange}
          items={props.data.subject}
          paramKey="subject"
          params={props.params.subject}
          title="Subject" />
      </div>
    </Modal>
  )
}

FacetModal.propTypes = {
  appElement: PropTypes.object,
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export const CollectionHitsModal = props => {
  return (
    <Modal
      appElement={props.appElement ? props.appElement : Modal.setAppElement("#root")}
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      className="modal-content--hits"
      overlayClassName={{
        base: "modal-overlay--hits slide--left",
        afterOpen: "slide--left--after-open",
        beforeClose: "slide--left--before-close"
      }}
      closeTimeoutMS={200} >
      <div className="modal-header--search">
        <h2 className="modal-header__title">Inside This Collection</h2>
        <button className="modal-header__button" aria-label="Close" onClick={props.toggleModal}>
          <MaterialIcon icon="close"/>
        </button>
      </div>
      <div className="modal-body">
        <CollectionHits
          collection={props.collection}
          children={props.children}
          isChildrenLoading={props.isChildrenLoading}
          isCollectionLoading={props.isCollectionLoading}
          params={props.params} />
      </div>
    </Modal>
  )
}

CollectionHitsModal.propTypes = {
  appElement: PropTypes.object,
  children: PropTypes.array.isRequired,
  collection: PropTypes.object.isRequired,
  isChildrenLoading: PropTypes.bool.isRequired,
  isCollectionLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
}
