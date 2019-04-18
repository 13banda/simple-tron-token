// handle tron backend api here
const contractAddress = 'TQpvN4UGVxxoD6bBZuFWd1CnCqa9fF7K9a'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

}


export default  utils;
