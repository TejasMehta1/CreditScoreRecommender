import json

def lambda_handler(event, context):
    ## Section One
    loans = event['loans']
    avg = 0
    late_loans = []
    for loan in loans:
        avg += loan.accuracy_value
        if loan.accuracy_value == 0:
            late_loans.append(loan)
    avg = avg / len(loans)

    ## Section Two
    cards = event['cards']
    message_two = ''

    if len(cards) < 3:
        message_two = 'It might be in your best interest to get more credit cards! Visit https://www.capitalone.com/credit-cards/'
    elif len(cards) > 3:
        message_two = 'Nice! Be sure to keep two on you and store the rest in a safe place! \n'
        if len(cards) > 5:
            message_two += 'Watch out for deadlines! Remember to pay on time for ALL of your cards!'
    
    ## Section Three
    per_card_ratio = {}
    overall_ratio = 0
    total_spending = 0
    total_limit = 0
    message_three = ''

    for card in cards:
        per_card_ratio[card.id] = (card.spending / card.limit)
        total_spending += card.spending
        total_limit += card.limit

    overall_ratio = total_spending / total_limit

    if overall_ratio <= 0.30:
        message_three = 'Doing great! You might look into spending a bit more as you are flexible.'
    elif overall_ratio <= 0.50:
        message_three = 'Your spending is not bad, but you need to be cautious as you are on the border!'
    else:
        message_three = 'You really need to stop spending this much! You might go over your limit and harm your credit score!'


    ## Section Four
    loan_type_counter = {}
    loan_counter = 0
    loan_diversity_score = 0
    message_four = ''
    for loan in loans:
        if loan.accuracy_value == 1: 
            loan_type_counter.add(loan.type)
            loan_counter += 1
    
    loan_diversity_score = loan_counter * len(loan_type_counter)

    if loan_diversity_score < 9:
        message_four = "You wouldn't see a huge impact in your credit score, but it is recommended to increase the number of credit accounts you have in your profile."
    else:
        message_four = "Great job! You are on track to reach your financial goals given that you continue paying on-time!"

    ## Section Five
    newest_credit_account = event['newest_credit_account']
    oldest_credit_account = event['oldest_credit_account']
    message_five = ''
    credit_age = (oldest_credit_account - newest_credit_account) / len(loans)
    
    if credit_age < 5:
        message_five = "Keep on utilizing these credit accounts and you will be on your way to a fantastic credit score!"
    else:
        message_five = "Awesome job! Continue you paying off your credit accounts on-time!"


    return {
        'statusCode': 200,
        'body': {
            'sectionOne': {
                'average_score': avg,
                'late_loans': late_loans
            }
            'sectionTwo': {
                'message_two': messageTwo,
                'credit_card_deadlines': cards
            }
            'sectionThree': {
                'message_three': message_three,
                'per_card_ratio': per_card_ratio,
                'overall_ratio': overall_ratio
            }
            'sectionFour': {
                "loan_diversity_score": loan_diversity_score,
                "message_four": message_four
            }
            'section_five': {
                "message_five": message_five
            }
        }
    }