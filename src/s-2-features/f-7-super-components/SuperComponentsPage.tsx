import React, {useState} from "react";
import SuperInputText from "../../s-3-components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../s-3-components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../s-3-components/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../s-3-components/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../s-3-components/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../s-3-components/c6-SuperRadio/SuperRadio";


const SuperComponentsPage = () => {
    //super select and radio
    const arr = ["x", "y", "z"]
    const [option, onChangeOption] = useState(arr[1])

    //super editable span
    const [span, setSpan] = useState<string>("")

    return (
        <div>
            <SuperInputText/>
            <hr/>
            <SuperButton>add</SuperButton>
            <hr/>
            <SuperCheckbox/>
            <hr/>
            <SuperEditableSpan
                value={span}
                onChangeText={setSpan}
                spanProps={{children: span ? undefined : "enter text..."}}
            />
            <hr/>
            <SuperSelect
                options={arr}
                value={option}
                onChangeOption={onChangeOption}
            />
            <hr/>
            <SuperRadio
                name={'radio'}
                options={arr}
                value={option}
                onChangeOption={onChangeOption}
            />
        </div>
    );
};

export default SuperComponentsPage;