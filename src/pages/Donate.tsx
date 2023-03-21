import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Donate: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Donate</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="prose max-w-none">
          <h2 className="mt-0 mb-3">
            Introduction to the <br />
            <big>
              <b>Swadeeq App</b>
            </big>
          </h2>
          <p>
            Swadeeq is an Islamic app that aims to help Muslims to stay
            consistent on their Deen and regenerate spiritually. It is a chatbot
            that provides helpful features, such as prayer times, Islamic
            rulings, reminders for dhikr and dua, and more. The app has a rich,
            dark-themed UI and provides a friendly chatbot that feels like a
            friend.
          </p>

          <h2 className="mt-6 mb-3">I need support</h2>
          <p className="mb-2">
            If you find the Swadeeq app helpful, you can support me by donating
            me money. <b>Why I am asking for Donations?</b> I built this app as
            sadaqah jariyah. But...
            <br />I come from a middle-class family in South India, Kerala. I am
            {` ${new Date().getFullYear() - 2004} `}
            years old, I had a software developer job. But when I joined for
            degree education, I can't get focused on degree and job at the same
            time, and eventually I have to quit the company and continue degree.
            <span className="block leading-5 my-3">
              <small>
                <i>
                  This is a separate discussion that why I chose the degree
                  rather than choosing the job and continuing it, for that you
                  can personally contact me because I can't say the reason
                  publicly. For now I can basically say it is becuase of our
                  social system.
                </i>
              </small>
            </span>
            <span className="my-3 leading-5 block">
              <small>
                Also, my family is not financially well-off, and I am solely
                dependent on the generosity of kind-hearted individuals who wish
                to help me for the sake of Allah SWT. Any donations, small or
                large, will be greatly appreciated and will go a long way in
                helping me achieve my goals.
              </small>
            </span>
            The cost of the 3-year degree program is around ₹108000 (Indian
            Rupee), equivalent to almost $1,316 (dollars). I have already paid
            ₹36000 ($439) dollars, but I am currently facing a financial crisis,
            and if I can't pay the remaining fees, I will have to drop out of
            college.
            <br /> <br />
            As a student, I understand the importance of education and the
            impact it can have on one's future. Therefore, I am humbly asking
            for your support and donations for the sake of Allah SWT. Your
            contributions will help me continue my education and complete my
            degree, enabling me to continue contributing to the development of
            the app and other projects for the betterment of the Ummah.
            <span className="my-3 block">
              May Allah SWT reward you abundantly for your support and help us
              succeed in this life and the Hereafter.
            </span>
          </p>
          <button className="btn block ml-auto">Donate now</button>

          <h2 className="mt-6 mb-3">The Importance of Donating in Islam</h2>
          <p>
            In Islam, donating to good causes is highly encouraged and is
            considered a virtuous act that brings immense rewards. Allah SWT
            says in the Quran,
          </p>
          <blockquote className="not-italic">
            "And donate from what We have provided for you before death comes to
            one of you, and you cry, “My Lord! If only You delayed me for a
            short while, I would give in charity and be one of the righteous.” "
          </blockquote>
          <a
            href="https://quran.com/en/al-munafiqun/10"
            target="_blank"
            rel="noreferrer"
            className="text-right ml-auto block"
          >
            - Quran 63:10
          </a>

          <p>
            The Prophet Muhammad (peace be upon him) also encouraged his
            companions to give in charity, saying
          </p>
          <blockquote className="not-italic">
            "Charity does not decrease wealth, no one forgives another except
            that Allah increases his honor, and no one humbles himself for the
            sake of Allah except that Allah raises his status."
          </blockquote>
          <a
            href="https://sunnah.com/muslim:2588"
            target="_blank"
            rel="noreferrer"
            className="text-right ml-auto block"
          >
            - Sahih Muslim 2588
          </a>

          {/* <h2 className="mt-6 mb-3">How to Donate</h2>
          <p>
            To donate, please navigate to the 'Donate' section within the
            Swadeeq app. You can choose the type of donation you would like to
            give and the amount. You will be redirected to a secure payment
            gateway where you can complete your donation.
          </p> */}

          <h2 className="mt-6 mb-3">Thank You for Your Support</h2>
          <p>
            I sincerely thank you for your support in helping me to develop and
            improve the Swadeeq app. May Allah SWT reward you abundantly for
            your good deeds and make it easy for you in this life and the
            Hereafter.
          </p>
          <div className="divider">Jazakallah Khair</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Donate;
