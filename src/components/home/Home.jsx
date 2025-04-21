function Home() {
  function logout() {
    console.log("logout");
  }

  return (
    <main>
      <div className="container">
        <div>
          <h3>Home</h3>
          <p>
            <a onClick={logout} href="#">
              Logout
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
export default Home;
