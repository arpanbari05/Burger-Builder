export const updateObject = ( prevState, updatedProps ) => {
    return {
        ...prevState,
        ...updatedProps
    }
}