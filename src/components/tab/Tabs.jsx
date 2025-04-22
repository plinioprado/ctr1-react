import { useNavigate } from "react-router-dom";

function TabList() {
  const navigate = useNavigate();

  const goto = (e, val) => {
    navigate(`/tab/${val}`);
    e.preventDefault();
  };

  return (
    <main>
      <div className="container">
        <h3>Settings</h3>
        <div className="data-table-header">
          <button
            type="button"
            class="btn btn-primary"
            onClick={(e) => goto(e, "new")}
          >
            Create
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <a href="#" onClick={(e) => goto(e, "3")}>
                  1
                </a>
              </th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">
                <a href="#" onClick={(e) => goto(e, "3")}>
                  2
                </a>
              </th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">
                <a href="#" onClick={(e) => goto(e, "3")}>
                  3
                </a>
              </th>
              <td>Larry</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
export default TabList;
