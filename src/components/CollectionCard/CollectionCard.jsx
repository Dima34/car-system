import Container from "../Container/Container"
import s from "./CollectionCard.module.css"


export default function CollectionCard(props) {
    
    return (
        <Container addClass = {s.CollectionCard}>
            <h2>
                {item.mark} {item.model}
            </h2>
            <p>
                Область: {item.state}
            </p>
        </Container>
    )
}