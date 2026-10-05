import './styles.scss'

const AgentAttribute = ({ label, value }) => (
  <div className='agent-attribute mb-40'>
    <dt className='agent-attribute__label m-0'>{label}</dt>
    <dd className='agent-attribute__value ml-0'>{value}</dd>
  </div>)

const AgentAttributeList = ({ items }) => {
  const listItems = Object.keys(items).map((item, index) =>
    <AgentAttribute
      key={index}
      label={item}
      value={items[item]} />
  )
  return (
    listItems.length ?
    (<dl className='agent__attributes m-0'>
      {listItems}
    </dl>) : (null)
  )
}

export default AgentAttributeList
