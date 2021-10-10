import React from 'react';
import {
    Card,
    CardHeader,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import API from '../../api';
import Header from '../../components/Header/header';
import Mountain from '../../assets/mountain.mp4';
import { Link } from 'react-router-dom';

export class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            details: [],
            lat: '',
            lon: '',
        };
    }

    componentDidMount() {
        API.getAllFavourite()
            .then( result => {
                if(result.status === 200) {
                    const data = result.body;
                    const loc = data.map(l => {
                        return l.locations;
                    })
                    this.setState({ locations: loc });
                }
            })
            .catch((error) => alert(error));

    }

    renderTable() {
        const { locations } = this.state;

        if (locations.length === 0) {
            return (
                <Table className="align-items-center table-flush" responsive>
                    <tbody>
                        <tr>
                            <td>
                                <span className="mb-0 text-sm">
                                    You have no Favourite locations!
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }

        return (
            <Table className="align-items-center table-flush" responsive>
                <tbody>
                    {locations && locations.map(item =>
                    (
                        <tr key={item}>
                            <td>
                                <Link to={`/home/${item}`}>
                                    <span className="mb-0 text-sm">
                                        {item}
                                    </span>
                                </Link>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>
        );
    }

    render() {
        return (
            <>
                <video autoPlay loop muted style={{
                    position: 'absolute',
                    width: '100%',
                    left: '50%',
                    top: '50%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '-1'
                }}>
                    <source src={Mountain} type="video/mp4" />
                </video>
                <Header />
                <Container className="mt--7" fluid style={{ marginTop: '20px'}}>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0" style={{ color: 'black' }}>{'My Favourite Locations'}</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                {this.renderTable()}
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
};

export default Favourite;

    