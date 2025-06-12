import { BookClubList } from "@/components/community/book-club-list"
import { DiscussionList } from "@/components/community/discussion-list"

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Book Clubs</h1>
          <BookClubList />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Discussions</h1>
          <DiscussionList />
        </div>
      </div>
    </div>
  )
}
