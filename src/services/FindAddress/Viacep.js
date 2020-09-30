import Axios from 'axios'

export const instance = Axios.create({
  baseURL: 'http://viacep.com.br/ws/',
})

export const findAddressByCep = async (cep) => {
  if (cep && cep.trim()) {
    const response = await instance.get(`${cep.trim()}/json`)
    return response
  }

  throw new Error()
}
