import { Link, redirect } from "remix"

export const action = ({request}) => {

    const form = await request.formData()

    const title = form.get('title')
    const body = form.get('body')

    const fields = {title, body}

    //submit to database



    return redirect('/posts')
}



function NewPost() {
    return (
        <>
            <div className="page-header">
                <h1>New Post</h1>
                <Link to="/posts" className="btn btn reverse">
                Back
                </Link>
            </div>

            <div className="page-content">
                <form method="post">
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="body">Post Body</label>
                        <textarea name="body" id="body" />
                        <button className="btn btn-block" type="submit"></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewPost
