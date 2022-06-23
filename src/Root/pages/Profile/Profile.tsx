import classes from "./profile.module.scss"

export default function Profile() {
    return (
        <div className={classes.page}>
            <div className={classes.header}></div>
            <div className={classes.container}>Profile</div>
            <aside className={classes.aside}></aside>
        </div>
    )
}
