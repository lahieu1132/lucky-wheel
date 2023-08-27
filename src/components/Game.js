import React from 'react'
import './index.css'
import PropTypes from 'prop-types'

export default class Wheel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: this.props.winner,
    }
    this.selectItem = this.selectItem.bind(this)
  }

  selectItem() {
    if (this.props.items.length === 0 || this.props.spinning === true) {
      console.log('Cant spin empty wheel')
      return
    }
    if (this.state.selectedItem === null) {
      const selectedItem = this.props.winner
      this.props.onChange(selectedItem)
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem)
      }
      this.setState({ selectedItem })
    } else {
      this.setState({ selectedItem: null })
      setTimeout(this.selectItem, 500)
    }
  }
  render() {
    const { selectedItem } = this.state
    const { items } = this.props

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    }
    const spinning = selectedItem !== null ? 'spinning' : ''

    let spinDuration = localStorage.getItem('duration')

    let cssProperties = {}

    cssProperties['--spinning-duration'] = `${spinDuration}s`
    cssProperties['--wheel-color'] = `${this.props.wheelColor}`
    cssProperties['--neutral-color'] = `${this.props.fontColor}`

    if (cssProperties['--wheel-color'] === 'null')
      cssProperties['--wheel-color'] = '#d38c12'

    if (cssProperties['--neutral-color'] === 'null')
      cssProperties['--neutral-color'] = '#FFFFFF'

    return (
      <div style={cssProperties} className="mt-10 lg:mt-0">
        <div className="wheel-container">
          <div
            lg={true}
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={this.selectItem}
          >
            {items.map((item, index) => (
              <div
                className="wheel-item"
                key={index}
                style={{ '--item-nb': index }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

// Define prop types
Wheel.propTypes = { items: PropTypes.array.isRequired }

// Define default prop values
