import { withPlugin } from "tinacms";
import CreateBlogPlugin from './MdxCreatorPlugin';

/**
 * withTinaWithPlugin allows us to have control over how we add
 * withPlugin HOC from tinacms
 */
export default function withTinaWithPlugin(Component: any){
    return (props: any) => {
        const {enableTinaCreate} = props;
        if(enableTinaCreate) {
            const ComponentWithTinaCreate = withPlugin(Component, CreateBlogPlugin);
            return <ComponentWithTinaCreate {...props} />
        }
        return <Component {...props} />
    }
}