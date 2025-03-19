"use client";
import MyButton from "@/components/common/form/my-button";
import { StarRating } from "@/components/common/rating";
import { IAverageRating } from "@/services/profile/profile.dto";
import { useState } from "react";

export const ReviewRating = ({ ratings }: { ratings: IAverageRating }) => {
  const [peer, setPeer] = useState(true);

  return (
    <div className="bg-white p-4 rounded-md divide-y">
      <div>
        <h3 className="text-lg font-semibold">Review & Ratings</h3>

        <div className="flex items-center gap-3 py-4">
          <p className="text-4xl font-bold">{ratings?.overallRating}</p>
          <div>
            <div>
              <StarRating
                initialRating={Number(ratings?.overallRating) || 0}
                isReadOnly
              />
            </div>
            <p className="text-sm text-gray-600">
              Based on {ratings?.total} reviews
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 py-4">
          <MyButton
            variant={"outline"}
            onClick={() => setPeer(true)}
            className={peer ? "bg-primary-500 text-white" : ""}
          >
            Peer
          </MyButton>
          <MyButton
            variant={"outline"}
            onClick={() => setPeer(false)}
            className={!peer ? "bg-primary-500 text-white" : ""}
          >
            Supervisor
          </MyButton>
        </div>

        {peer ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-semibold">Communication</p>
              <div>
                <StarRating
                  initialRating={Number(ratings?.peer.peerCommunication)}
                  isReadOnly
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold">Technical Skills</p>
              <div>
                <StarRating
                  initialRating={Number(ratings?.peer.peerTechnicalSkills)}
                  isReadOnly
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold">Accountability</p>
              <div>
                <StarRating
                  initialRating={Number(ratings?.peer.peerAccountability)}
                  isReadOnly
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold">Problem-Solving</p>
              <StarRating
                initialRating={Number(ratings?.peer.peerProblemSolving)}
                isReadOnly
              />
            </div>
            <div>
              <p className="text-xs font-semibold">Adaptability</p>
              <StarRating
                initialRating={Number(ratings?.peer.peerAdaptability)}
                isReadOnly
              />
            </div>
            <div>
              <p className="text-xs font-semibold">Professionalism</p>
              <div>
                <StarRating
                  initialRating={Number(ratings?.peer.peerProfessionalism)}
                  isReadOnly
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold">Employee Development</p>
                <div>
                  <StarRating
                    initialRating={Number(
                      ratings?.supervisor.supEmployeeDevelopment
                    )}
                    isReadOnly
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold">Communication</p>
                <div>
                  <StarRating
                    initialRating={Number(ratings?.supervisor.supCommunication)}
                    isReadOnly
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold">Transparency</p>
                <div>
                  <StarRating
                    initialRating={Number(ratings?.supervisor.supTransparency)}
                    isReadOnly
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold">Knowledge</p>
                <StarRating
                  initialRating={Number(ratings?.supervisor.supKnowledge)}
                  isReadOnly
                />
              </div>
              <div>
                <p className="text-xs font-semibold">Leadership</p>
                <StarRating
                  initialRating={Number(ratings?.supervisor.supLeaderShip)}
                  isReadOnly
                />
              </div>
              <div>
                <p className="text-xs font-semibold">Fairness</p>
                <div>
                  <StarRating
                    initialRating={Number(ratings?.supervisor.supFairness)}
                    isReadOnly
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
