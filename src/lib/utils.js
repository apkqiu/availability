import MarkdownIt from "markdown-it";


//#endregion
//#region variable tools
export const Variable = {
    watch(value_func, callback_func, first_call = value_func()) {
        let old_value = first_call;
        let old_json = JSON.stringify(old_value);
        setInterval(() => {
            let new_value = value_func();
            let new_json = JSON.stringify(new_value);
            if (old_json != new_json) {
                if (callback_func.length == 0) callback_func();
                else if (callback_func.length == 1) callback_func(new_value);
                else callback_func(old_value, new_value)
                old_value = new_value;
                old_json = new_json;
            }
        }, 10);
    }
}
//#endregion