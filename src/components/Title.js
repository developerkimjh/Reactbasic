import StorageDel from "./StorageDel/StorageDel";

const Title = (props) => {
  return (
    <div>
      <StorageDel />
      <h1>{props.children}</h1>
    </div>
  );
};

export default Title;
