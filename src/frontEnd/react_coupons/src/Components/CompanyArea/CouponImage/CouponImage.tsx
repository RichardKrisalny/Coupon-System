import { useParams } from "react-router-dom";
import "./CouponImage.css";

function CouponImage(): JSX.Element {
    const params = useParams();
    const id = params.couponId;
    return (
        <div className="CouponImage">
			<img src={"http://localhost:8080/"+id}/>
        </div>
    );
}

export default CouponImage;
