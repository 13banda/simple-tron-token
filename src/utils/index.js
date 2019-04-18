// handle tron backend api here
const contractAddress = 'TMHw5i98uNSJ79pjAKogSRiAtBzUv3Qb28'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

}


export default  utils;
