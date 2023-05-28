import Link from "./Link"
import { Stack } from "@mui/material"

const LinksWrapper = function(props){
    const {sections} = props
    const sectionIsArray = Array.isArray(sections)

    return (
        <div className="links">
            
            <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            >
                {sectionIsArray ? sections.map(section => Link(section)) : 'no links'}

            </Stack>

        </div>
    )
}

export default LinksWrapper