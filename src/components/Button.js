import PropTypes from 'prop-types'

const Button = ({color, text, onclick}) => {
    return <button onClick={onclick} style={{backgroundColor: color}} className="btn">{text}</button>
}

Button.defaultProps = {
    color: "green",
    text: "Add"
}

Button.prototype = {
    color: PropTypes.string,
    text: PropTypes.string,
    onclick: PropTypes.func
}

export default Button
