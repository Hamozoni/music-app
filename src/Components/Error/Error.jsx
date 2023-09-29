import "./Error.scss";

const Error = ({error})=> {
   return (
    <div className="error">
       <h3>oops {error?.message}</h3>
       <button onClick={()=> window.location.reload()}>retry</button>
    </div>
   );
};

export default Error;