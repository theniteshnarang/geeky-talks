export const handleInputChange = (e, setInput) => {
    const { name, value } = e.target
    setInput(input => ({ ...input, [name]: value }))
}