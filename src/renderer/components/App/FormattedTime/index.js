/**
 * @file Mixin VueJS pour formater un temps.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

export default {
  computed: {
    /**
     * Formate un temps en secondes en une chaine de caracteres minutes et secondes.
     * @param {Number} seconds - Le temps a formater (en secondes).
     * @returns {String} La chaine formatee.
     */
    formattedTime () {
      return seconds => {
        let secondsString = Math.trunc(seconds % 60) + ''
        let minutesString = Math.trunc(seconds / 60) + ''
        secondsString = (secondsString.length < 2 ? '0' : '') + secondsString
        minutesString = (minutesString.length < 2 ? '0' : '') + minutesString

        return `${minutesString}:${secondsString}`
      }
    }
  }
}
