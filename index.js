const fs = require('fs')
const csv = require('csvtojson')

const recordZipCodeCount = async () => {

    /* declare variables to hold zip codes and prefix for file names */
    let zipCodes = []
    let prefix = ''
    
    /* loop through the ten csv files */
    for (let i = 1; i < 11; i++) {
        if (i < 10) {
            prefix = '0'
        } else {
            prefix = ''
        }
        console.log(prefix + i)
        /* read data from csv files and store in customers array */
        let customers = await csv().fromFile(`./data/Group${prefix + i}.csv`)

        /* function to map over customers array and count zip code occurrences */
        const countZipCodes = () => {
            customers.map(customer => {
                const i = zipCodes.findIndex(z => z.zipCode === customer.ZipCode)
                if (i > -1) {
                    zipCodes[i].count += 1
                } else {
                    zipCodes.push({'zipCode': customer.ZipCode, 'count': 1})
                }
            })
        }

        countZipCodes()
    }

    /* format and create csv text for csv output file */
    let header = Object.keys(zipCodes[0]).join(',')
    let values = zipCodes.map(z => Object.values(z).join(',')).join('\n')
    let csvText = header + '\n' + values
    console.log(csvText)
    /* write output to csv file */
    fs.writeFileSync('./data/ZipCodeCount.csv', csvText)
}

recordZipCodeCount()