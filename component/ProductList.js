import { useEffect, useState } from "react";

const ProductList = () => {
  const [data, setData] = useState();
  const [stream, setStream] = useState(false);

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "gbp",
  });

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:3000/stream");
    eventSource.onmessage = (e) => updateProdutList(JSON.parse(e.data));
  }, []);

  const updateProdutList = (product) => {
    setData([...product]);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <table className="table table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.Id}>
            <td>{p.Id}</td>
            <td>{p.Title}</td>
            <td>{formatter.format(p.Price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
