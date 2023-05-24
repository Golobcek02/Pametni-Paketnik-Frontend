export function UserBoxesAndAccesses(props) {
    return (<>
            <div className="box">
                <h2>Your boxes:</h2>
                <div className="user">
                    {props.userBoxes.map((box, i) => (<>
                            <p style={{color: "#DF2E38"}}>Box Id: {box.BoxId}</p>
                            {props.usernames[i].length !== 0 ? (<>
                                    <span
                                        className="username">Users who have access: {props.usernames[i].join(", ")}</span>
                                </>) : (<span className="username">No users have access to this box</span>)}
                        </>))}
                </div>
            </div>
        </>)
}