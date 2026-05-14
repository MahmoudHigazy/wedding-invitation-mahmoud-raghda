export async function GET() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mahmoud & Raghda Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'DTSTART;TZID=Africa/Cairo:20260626T180000',
    'DTEND;TZID=Africa/Cairo:20260627T000000',
    'SUMMARY:Mahmoud & Raghda — Wedding',
    'DESCRIPTION:Wedding ceremony at 6:00 PM followed by reception.\\nVenue: Taracina Wedding on the Nile\\, Manial Shiha\\, Giza',
    'LOCATION:Taracina Wedding on the Nile\\, Manial Shiha\\, Giza',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Mahmoud & Raghda\'s Wedding is tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return new Response(ics, {
    headers: {
      'Content-Type':        'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="mahmoud-raghda-wedding.ics"',
    },
  })
}
