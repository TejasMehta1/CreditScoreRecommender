# https://0uyz2m6qdd.execute-api.us-east-1.amazonaws.com/default/credit-score-breakdown-scripts
import json

def lambda_handler(event, context):
    ## Section One
    event_body = json.loads(event['body'])
    loans = event_body['loans']
    avg = 0
    score_one = 0
    late_loans = []
    for loan in loans['loan_array']:
        print(loan['accuracy_value'])
        avg += loan['accuracy_value']
        if loan['accuracy_value'] == 0:
            late_loans.append(loan)

    avg = avg / len(loans['loan_array'])

    if avg < 70: 
        score_one = 1
    elif avg < 85:
        score_one = 2
    else: 
        score_one = 3

    ## Section Two
    cards = event_body['cards']
    message_two = ''
    score_two = 0

    if len(cards["card_array"]) < 3:
        message_two = 'It might be in your best interest to get more credit cards! Visit https://www.capitalone.com/credit-cards/'
    elif len(cards["card_array"]) >= 3:
        message_two = 'Nice! Be sure to keep two on you and store the rest in a safe place! \n'
        if len(cards["card_array"]) > 5:
            message_two += 'Watch out for deadlines! Remember to pay on time for ALL of your cards!'

    if len(cards["card_array"]) < 3: 
        score_two = 1
    elif len(cards["card_array"]) <= 4:
        score_two = 3
    else: 
        score_two = 2
    
    ## Section Three
    per_card_ratio = {}
    overall_ratio = 0
    total_spending = 0
    total_limit = 0
    message_three = ''
    score_three = 0

    for card in cards["card_array"]:
        per_card_ratio[card['id']] = (card['spending'] / card['limit'])
        total_spending += card['spending']
        total_limit += card['limit']

    overall_ratio = total_spending / total_limit

    if overall_ratio <= 0.30:
        message_three = 'Doing great! You might look into spending a bit more as you are flexible.'
    elif overall_ratio <= 0.50:
        message_three = 'Your spending is not bad, but you need to be cautious as you are on the border!'
    else:
        message_three = 'You really need to stop spending this much! You might go over your limit and harm your credit score!'

    if overall_ratio <= 0.30: 
        score_three = 3
    elif overall_ratio <= 0.50:
        score_three = 2
    else: 
        score_three = 1

    ## Section Four
    loan_type_counter = set()
    loan_counter = 0
    loan_diversity_score = 0
    message_four = ''
    score_four = 0
    
    for loan in loans['loan_array']:
        if loan['accuracy_value'] == 1: 
            loan_type_counter.add(loan['loan_type'])
            loan_counter += 1
    
    loan_diversity_score = loan_counter * len(loan_type_counter)

    if loan_diversity_score < 9:
        message_four = "You wouldn't see a huge impact in your credit score, but it is recommended to increase the number of credit accounts you have in your profile."
    else:
        message_four = "Great job! You are on track to reach your financial goals given that you continue paying on-time!"

    if loan_diversity_score < 6: 
        score_four = 1
    elif loan_diversity_score < 9:
        score_four = 2
    else: 
        score_four = 3

    ## Section Five
    newest_credit_account = event_body['newest_credit_account']
    oldest_credit_account = event_body['oldest_credit_account']
    message_five = ''
    credit_age = (oldest_credit_account - newest_credit_account) / len(loans)
    score_five = 0
    
    if credit_age < 5:
        message_five = "Keep on utilizing these credit accounts and you will be on your way to a fantastic credit score!"
    else:
        message_five = "Awesome job! Continue you paying off your credit accounts on-time!"

    if credit_age < 3: 
        score_five = 1
    elif credit_age < 7:
        score_five = 2
    else: 
        score_five = 3

    overall_score = round((score_one * .35) + (score_two * .1) + (score_three * .3) + (score_four * .1) + (score_five * .15))

    return {
        'statusCode': 200,
        'body': json.dumps({
            'sectionOne': {
                'average_score': avg,
                'late_loans': late_loans,
                'score_one': score_one
            },
            'sectionTwo': {
                'message_two': message_two,
                'credit_card_deadlines': cards["card_array"],
                'score_two': score_two
            },
            'sectionThree': {
                'message_three': message_three,
                'per_card_ratio': per_card_ratio,
                'overall_ratio': overall_ratio,
                'score_three': score_three

            },
            'sectionFour': {
                "loan_diversity_score": loan_diversity_score,
                'message_four': message_four,
                'score_four': score_four
            },
            'section_five': {
                'message_five': message_five,
                'score_five': score_five
            },
            "overall_score": overall_score
        })
    }