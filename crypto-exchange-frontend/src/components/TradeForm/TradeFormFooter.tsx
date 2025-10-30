import { Button } from "../ui/button"
import { CardFooter } from "../ui/card"
import { Field } from "../ui/field"

type TradeFormFooterProps = {
  tradeError: string | null
  onReset: () => void
}

const TradeFormFooter = ({ tradeError, onReset }: TradeFormFooterProps) =>

    <CardFooter>
        <Field orientation="horizontal">
            {tradeError && <div>{tradeError}</div>}
            <Button type="button" variant="outline" onClick={onReset}>
                Reset
            </Button>
            <Button type="submit" form="trade-form">
                Submit
            </Button>
        </Field>
    </CardFooter>

export default TradeFormFooter