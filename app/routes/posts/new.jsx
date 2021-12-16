import { Link } from "remix"

function NewPost() {
    return (
        <>
            <div className="page-header">
                <h1>New Post</h1>
                <Link to="/posts" className="btn btn reverse">
                </Link>
            </div>
        </>
    )
}

export default NewPost
