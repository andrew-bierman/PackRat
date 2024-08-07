/**
 * Converts a region name or abbreviation to its corresponding abbreviation or name.
 *
 * @param {string} input - The region name or abbreviation to convert.
 * @param {string} to - The conversion direction. Possible values are "abbr" for abbreviation to name conversion and "name" for name to abbreviation conversion.
 * @return {string} The converted region name or abbreviation.
 */

type Region = [string, string];

export default function abbrRegion(
  input: string,
  to: 'abbr' | 'name',
): string | undefined {
  const states: Region[] = [
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['American Samoa', 'AS'],
    ['Arizona', 'AZ'],
    ['Arkansas', 'AR'],
    ['Armed Forces Americas', 'AA'],
    ['Armed Forces Europe', 'AE'],
    ['Armed Forces Pacific', 'AP'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['District Of Columbia', 'DC'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Guam', 'GU'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Marshall Islands', 'MH'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Northern Mariana Islands', 'NP'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Puerto Rico', 'PR'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['US Virgin Islands', 'VI'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
  ];

  // So happy that Canada and the US have distinct abbreviations
  const provinces: Region[] = [
    ['Alberta', 'AB'],
    ['British Columbia', 'BC'],
    ['Manitoba', 'MB'],
    ['New Brunswick', 'NB'],
    ['Newfoundland', 'NF'],
    ['Northwest Territory', 'NT'],
    ['Nova Scotia', 'NS'],
    ['Nunavut', 'NU'],
    ['Ontario', 'ON'],
    ['Prince Edward Island', 'PE'],
    ['Quebec', 'QC'],
    ['Saskatchewan', 'SK'],
    ['Yukon', 'YT'],
  ];

  const regions: Region[] = states.concat(provinces);

  let i; // Reusable loop variable
  if (to == 'abbr') {
    input = input?.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    const found = regions.find(([name]) => name === input);
    if (found) {
      return found[1];
    }
    // for (i = 0; i < regions.length; i++) {
    //   if (regions[i][0] == input) {
    //     return regions[i][1];
    //   }
    // }
  } else if (to == 'name') {
    input = input.toUpperCase();

    const found = regions.find(([name]) => name === input);
    if (found) {
      return found[0];
    }
    // for (i = 0; i < regions.length; i++) {
    //   if (regions[i][1] == input) {
    //     return regions[i][0];
    //   }
    // }
  }
  return undefined;
}
