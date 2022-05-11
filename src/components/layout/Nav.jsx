import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { NavLink } from "react-router-dom"
import routes from "../../routes"

function Nav () {
    const { currentUser, logoutUser } = useContext(UserContext)
    
    const menuLinks = [routes.auth.options]
    const adminLinks = [routes.admin.users]
    const generalLinks = [routes.general.login]

    const renderAuth = () => {
        return (
            generalLinks.map(item =>      
                <li className="flex" key={ item.name }>
                    <NavLink 
                        className="button action-button" 
                        to={ item.url }>
                            { item.name }
                    </NavLink>
                </li>
            )
        )
    }

    const renderUserDetails = () => {
        return (
            <li className="flex items-center ml-4">
                <div className="h-8 w-8 rounded-full bg-green-400"></div>
                <div className="flex ml-2">{ currentUser.user }</div>
                <button onClick={ logoutUser } className="ml-4 button action-button">Logout</button>
            </li>
        )
    }

    return (
        <nav className="nav">
            <div className="nav-content">
                <div className="font-black">User-Images APP</div>
                <div className="menu-wrapper">
                    <ul className="menu">
                        { currentUser?.isAdmin && adminLinks.map(link => 
                            <li className="flex" key={ link.name }>
                                <NavLink 
                                    className="menu-link" 
                                    to={ link.url }>
                                        { link.name }
                                </NavLink>
                            </li>    
                        )}
                    </ul>
                    <ul className="menu">
                        { currentUser && menuLinks.map(link => 
                            <li className="flex" key={ link.name }>
                                <NavLink 
                                    className="menu-link" 
                                    to={ link.url }>
                                        { link.name }
                                </NavLink>
                            </li>) }
                            { currentUser? renderUserDetails():renderAuth() }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav