class CepService {

    public async getCep(cep: string){
        try {
            return await $fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: 'GET',
            })
        } catch(error){
            console.error(error)
        }
    }
}

export default new CepService()