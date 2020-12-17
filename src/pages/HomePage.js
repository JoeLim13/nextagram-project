import React from 'react';
import UserImages from '../containers/UserImages';
import {
    Card, CardImg, CardBody,
    CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = ({ users }) => {

    return (

        <div>
            {users.map(user => {
                return (
                    <div key={user.id} className="d-flex" style={{ backgroundColor: "lightblue", marginBottom: "10px", padding: "20px" }}>

                        <Card className="col-3 d-flex align-items-center flex-wrap" style={{ width: "25vw", margin: "0px", borderStyle: "none", backgroundColor: "lightgray", textAlign: "center" }}>

                            <CardImg className="rounded-circle" top width="100%" src={user.profileImage} alt="Card image cap" style={{ width: "200px", border: "4px solid white", marginTop: "15px" }} />
                            <CardBody >
                                <CardTitle>{user.username}</CardTitle>
                                <Link to={`/users/${user.id}`}>
                                    <Button>View Profile</Button>
                                </Link>

                            </CardBody>

                        </Card>

                        <div className="col-9 d-flex flex-wrap">
                            <UserImages userId={user.id} />
                        </div>

                    </div>
                )
            })}
        </div>

    );
}
export default HomePage;