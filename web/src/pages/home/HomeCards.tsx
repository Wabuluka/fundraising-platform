import { Heart, Shield, Target, Users } from "lucide-react";

export default function HomeCards() {
  return (
    <div className=" sm:w-2/3 w-full mx-auto">
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose WeGo Harambe!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow">
              <div className="card-body items-center text-center">
                <Heart className="text-primary" size={48} />
                <h3 className="card-title">Easy to Use</h3>
                <p>Create and manage campaigns in minutes</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body items-center text-center">
                <Shield className="text-primary" size={48} />
                <h3 className="card-title">Secure Payments</h3>
                <p>Safe and encrypted transactions</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body items-center text-center">
                <Target className="text-primary" size={48} />
                <h3 className="card-title">Reach Goals</h3>
                <p>Track progress in real-time</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body items-center text-center">
                <Users className="text-primary" size={48} />
                <h3 className="card-title">Community Support</h3>
                <p>Connect with generous donors</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
