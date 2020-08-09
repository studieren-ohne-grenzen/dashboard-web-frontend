/* eslint-disable camelcase */
const scoring = require('./scoring')
const matching = require('./matching')
const time_estimates = require('~/node_modules/zxcvbn/lib/time_estimates')

const feedback = {
  default_feedback: {
    warning: '',
    suggestions: [
      'Verwende ein paar Wörter, vermeide übliche Ausdrücke',
      'Es besteht keine Notwendigkeit für Symbole, Ziffern oder Großbuchstaben',
    ],
  },
  get_feedback(score, sequence) {
    let i, len, longest_match, match
    if (sequence.length === 0) {
      return this.default_feedback
    }
    if (score > 2) {
      return {
        warning: '',
        suggestions: [],
      }
    }
    longest_match = sequence[0]
    const ref = sequence.slice(1)
    for (i = 0, len = ref.length; i < len; i++) {
      match = ref[i]
      if (match.token.length > longest_match.token.length) {
        longest_match = match
      }
    }
    let feedback = this.get_match_feedback(longest_match, sequence.length === 1)
    // const extra_feedback =
    //  'Füge ein oder zwei weitere Wörter hinzu. Seltene Wörter sind besser'
    if (feedback != null) {
      // feedback.suggestions.unshift(extra_feedback)
      if (feedback.warning == null) {
        feedback.warning = ''
      }
    } else {
      feedback = {
        warning: '',
        suggestions: [],
      }
    }
    return feedback
  },
  get_match_feedback(match, is_sole_match) {
    let warning
    switch (match.pattern) {
      case 'dictionary':
        return this.get_dictionary_match_feedback(match, is_sole_match)
      case 'spatial':
        warning =
          match.turns === 1
            ? 'Gerade Tastenreihen sind leicht zu erraten'
            : 'Kurze Tastaturmuster sind leicht zu erraten'
        return {
          warning,
          suggestions: [
            'Verwende ein längeres Tastaturmuster mit mehr Wendungen',
          ],
        }
      case 'repeat':
        warning =
          match.base_token.length === 1
            ? 'Wiederholungen wie "aaa" sind leicht zu erraten'
            : 'Wiederholungen wie "abcabcabcabc" sind nur geringfügig schwieriger zu erraten als "abc"'
        return {
          warning,
          suggestions: ['Vermeide wiederholte Wörter und Zeichen'],
        }
      case 'sequence':
        return {
          warning: 'Folgen wie abc oder 6543 sind leicht zu erraten',
          suggestions: ['Vermeide Folgen'],
        }
      case 'regex':
        if (match.regex_name === 'recent_year') {
          return {
            warning: 'Die letzten Jahre sind leicht zu erraten',
            suggestions: [
              'Vermeide die letzen Jahre',
              'Vermeide Jahre, die mit dir in Verbindung stehen',
            ],
          }
        }
        break
      case 'date':
        return {
          warning: 'Datumsangaben sind oft leicht zu erraten',
          suggestions: [
            'Vermeide Datumsangaben, die mit dir in Verbindung stehen',
          ],
        }
    }
  },
  get_dictionary_match_feedback(match, is_sole_match) {
    let ref
    const warning =
      match.dictionary_name === 'passwords'
        ? is_sole_match && !match.l33t && !match.reversed
          ? match.rank <= 10
            ? 'Dies ist ein gängiges Top-10-Passwort'
            : match.rank <= 100
            ? 'Dies ist ein gängiges Top-100-Passwort'
            : 'Dies ist ein gängiges Passwort'
          : match.guesses_log10 <= 4
          ? 'Dies ähnelt einem häufig verwendeten Passwort'
          : undefined
        : match.dictionary_name === 'english_wikipedia' ||
          match.dictionary_name === 'populaere'
        ? is_sole_match
          ? 'Ein Wort an sich ist leicht zu erraten'
          : 'Gebräuchliche Wörter sind leicht zu erraten'
        : (ref = match.dictionary_name) === 'surnames' ||
          ref === 'male_names' ||
          ref === 'female_names' ||
          ref === 'vornamen' ||
          ref === 'nachnamen'
        ? is_sole_match
          ? 'Namen und Familiennamen an sich sind leicht zu erraten'
          : 'Gebräuchliche Namen und Familiennamen sind leicht zu erraten'
        : ''
    const suggestions = []
    const word = match.token
    if (word.match(scoring.START_UPPER)) {
      suggestions.push('Großschreibung ist nicht sehr hilfreich')
    } else if (word.match(scoring.ALL_UPPER) && word.toLowerCase() !== word) {
      suggestions.push(
        'Alles in Großbuchstaben ist fast so leicht zu erraten wie alles in Kleinbuchstaben'
      )
    }
    if (match.reversed && match.token.length >= 4) {
      suggestions.push(
        'Umgekehrte Wörter sind nicht viel schwieriger zu erraten'
      )
    }
    if (match.l33t) {
      suggestions.push(
        "Vorhersehbare Ersetzungen wie '@' anstelle von 'a' helfen wenig"
      )
    }
    const result = {
      warning,
      suggestions,
    }
    return result
  },
}

const time = function () {
  return new Date().getTime()
}

const zxcvbn = function (password, user_inputs) {
  let arg, i, len, prop, ref, val
  if (user_inputs == null) {
    user_inputs = []
  }
  const start = time()
  const sanitized_inputs = []
  for (i = 0, len = user_inputs.length; i < len; i++) {
    arg = user_inputs[i]
    if (
      (ref = typeof arg) === 'string' ||
      ref === 'number' ||
      ref === 'boolean'
    ) {
      sanitized_inputs.push(arg.toString().toLowerCase())
    }
  }
  matching.set_user_input_dictionary(sanitized_inputs)
  const matches = matching.omnimatch(password)
  const result = scoring.most_guessable_match_sequence(password, matches)
  result.calc_time = time() - start
  const attack_times = time_estimates.estimate_attack_times(result.guesses)
  for (prop in attack_times) {
    val = attack_times[prop]
    result[prop] = val
  }
  result.feedback = feedback.get_feedback(result.score, result.sequence)
  return result
}

module.exports = zxcvbn
