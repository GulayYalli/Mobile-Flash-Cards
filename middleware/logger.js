const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action: ', action)
        console.log()
        const returnvalue = next(action)
        console.log('the new state:', store.getState())
        console.groupEnd()
        return returnvalue
}

export default logger