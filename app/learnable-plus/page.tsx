import React from 'react'
import myUser from '../actions/getUser';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function LearnablePlus() {

  const user = await myUser();



    async function createCheckoutSession(data:FormData) {

        'use server'


        const user = await myUser();

        // const courses = await prisma.course.findFirst({
            
        // })
        


        const lookup = data.get('lookup_key') as string
        const prices = await stripe.prices.list({
          lookup_keys: [lookup],
          expand: ['data.product']
        })
    
        
        const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'auto',

          line_items: [
            {

              price: "price_1OEl0cSIY9EtPABscwJ1n2vR",
              // For metered billing, do not pass quantity
              quantity: 1,
      
            },
          ],
          subscription_data: {
            metadata: {
              userId:user?.id as string,
            }
          },
          
          mode: 'subscription',
          success_url: `http://localhost:3000/learnable-plus/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:3000?canceled=true`,

  
      }) 
      redirect(session.url || '')

      }


    async function createPortalSession() {
        'use server'
      
      
        console.log(user?.stripePurchasedId);
        
      
        if(!user) {
          throw new Error("no user")
        }

        if(!user?.stripePurchasedId) {
          throw new Error("no user")
        }
      
        const portalSession = await stripe.billingPortal.sessions.create({

          customer: user.stripePurchasedId,
          return_url: `http://localhost:3000/learnable-plus`
        })
      
        console.log(portalSession);
        
         redirect(portalSession.url)
      }

  return (
    <div className='container flex justify-center items-center flex-col py-12'>
                  <h1 className='text-[3rem]'>Manage your subscription</h1>
                  {user?.stripePurchasedId && (
                    <div>
                      <p>you're a pro member!</p>
                    </div>
                  )}
    {!user?.stripePurchasedId ?(
                    <div className='text-center'>
                      <p className='text-neutral-600'>access to all courses with plus</p>
                      <p className='text-xs'>cancel at any time.</p>

                    </div>
                  ):null}
                         <form action={user?.plan === "PRO" ? createPortalSession : createCheckoutSession} className="py-2">

                                    <input type="hidden" name="lookup_key" value="monthly-pro" />

                                <Button type="submit" className="py-6 bg-white text-black rounded-none hover:text-white">
                                        {user?.plan === "PRO" ? 'Manage your subscription' : 'Get pro'}
                                </Button>
                        </form>
    </div>
  )
}
