import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";

function ServerError() {
    const { commonStore } = useStore();

    return (
        <Container>
            <Header as='h1'>
                Server Error
            </Header>
            <Header sub as='h5' color="red">
                {
                    commonStore.error.message &&
                    <Segment>
                        <Header as='h4' color="teal">
                            Stack trace
                        </Header>
                        <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                    </Segment>
                }
            </Header>
        </Container>
    );
}

export default observer(ServerError);