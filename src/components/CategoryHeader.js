import { Panel, Typography } from "@maxhub/max-ui";

function CategoryHeader(props) {
    return (
        <Panel mode="pimary" className="ml-16 mb-5">
            <Typography.Headline>
                {props.title}
            </Typography.Headline>
        </Panel>
    )
}

export default CategoryHeader;
