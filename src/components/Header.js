import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router'

const Header = ({title, onAdd, showAddTask}) => {
    const location = useLocation()

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === "/" && <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Colse' : 'Add'} onclick={onAdd}></Button>}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.prototype = {
    title: PropTypes.string.isRequired
}

export default Header
