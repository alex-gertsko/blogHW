import Link from "./Link"

const LinksWrapper = function(props){
    const {sections} = props
    const sectionIsArray = Array.isArray(sections)

    return (
        <div className="links">
            {sectionIsArray ? sections.map(section => Link(section)) : 'no links'}
        </div>
    )
}

export default LinksWrapper