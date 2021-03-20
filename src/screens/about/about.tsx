import React from 'react';
import { ScrollView } from 'react-native';

import { screenStyles } from 'styles';
import { Paragraph } from 'components/content';
import { PageWrapper } from 'components/page';

export const AboutScreen = () => (
  <ScrollView style={screenStyles.screenWrapper}>
    <PageWrapper>
      <Paragraph>
        W erze szumu medialnego, wszechobecnego chaosu, dezinformacji,
        atakujących z każdej strony reklam i powiadomień, upadku
        konwencjonalnych mediów i zalewu półpraw i fake newsów coraz bardziej
        potrzeba rzetelnych osób śledzących bieżące wydarzenia na świecie.
      </Paragraph>
      <Paragraph>
        Ta aplikacja to miejsce gdzie w spokoju będziesz mógł przeczytać od
        sprawdzonych i niezależnych osób o tym co się dzieje w różnych zakątkach
        globu. Nie będziesz mógł tutaj lajkować ani komentować - przyświecającym
        mi celem było to abyś miał gdzie uciec zamiast zalewać Cię kolejną toną
        bezwartościowych treści.
      </Paragraph>
      <Paragraph>
        Aplikację przygotowałem nonprofit. Jeśli kiedykolwiek pojawi się reklama
        to tylko w nieinwazyjnej formie, zgodna z tematyką i zaakceptowana przez
        większość współtworzących tutaj treści autorów.
      </Paragraph>
      <Paragraph>
        Jeśli dostrzeżesz błąd będę wdzięczny za jego zgłoszenie.
      </Paragraph>
      <Paragraph>Piotr Ryczek</Paragraph>
    </PageWrapper>
  </ScrollView>
);
