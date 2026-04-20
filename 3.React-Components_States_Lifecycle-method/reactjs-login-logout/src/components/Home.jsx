function Home({onLogOut}) {
    return (
        <div style={{textAlign: "center"}}>
            <h1>Welcome</h1>
            <button onClick={onLogOut}>Logout</button>
        </div>
    );
}

export default Home;