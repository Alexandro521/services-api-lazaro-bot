
export function googleLink(query){
    return {
    url: `https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=20&hl=es&source=gcsc&gss=.com&cselibv=8435450f13508ca1&searchtype=image&cx=116e926113427412d&q=${query}&safe=off&cse_tok=AB-tC_7No-sDzLbQgiOU6CORQuzE%3A1714488715256&lr=&cr=&gl=&filter=0&sort=&as_oq=&as_sitesearch=&exp=cc%2Capo&fexp=72519171%2C72519168&oq=goku&gs_l=partner-web.3..0j0i512i433l2j0i512l7.21189.22038.0.23102.4.4.0.0.0.0.355.1007.0j2j0j2.4.0.csems%2Cnrl%3D10...0....1.34.partner-web..2.2.461.3g8pDB9CfP0&cseclient=hosted-page-client&callback=google.search.cse.api10860`,
  
    clearHeader: 'google.search.cse.api10860('
}
} 
export function youtubeLink(query){
    return {
    url: `https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=es&source=gcsc&gss=.com&cselibv=8435450f13508ca1&cx=c36ee4000f4314cab&q=${query}&safe=off&cse_tok=AB-tC_58JKtL7W9c9htavTFeqZLp%3A1713395617208&lr=&cr=&gl=&filter=0&sort=&as_oq=&as_sitesearch=&exp=cc%2Cpos%2Cdtsq-3&fexp=72519171%2C72519168&oq=fernanfloo&gs_l=partner-web.12..0i512i433j0i512l9.13393.16399.0.17964.10.10.0.0.0.0.154.1254.0j10.10.0.csems%2Cnrl%3D10...0....1.34.partner-web..0.10.1254.X4Zn4ldmVPk&cseclient=hosted-page-client&callback=google.search.cse.api2723`,
    clearHeader: 'google.search.cse.api2723'}}