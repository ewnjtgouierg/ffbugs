I'm making some edits of firefox source code fixing and customizing some things. Some of the changes I'll try to contribute as patches. Some of them might be accepted, others - not. Yet others I will not even try to submit since they contradict what developers already said in discussions on bugzilla, and they will only be present in my fork.

I'm thinking of what would be the optimal workflow.

I am working on every customization / fix in a separate feature branch. When I'm done with one of them, i'll create a patch and submit it.

But in my fork repo I prefer to keep every feature as separate branch for the case i need to revisit it in the future - in case it needs to be updated.

The part of workflow that involves contributing to the main FireFox ends here.

need:

- stable release - for primary use
	- includes all fixes and customizations marked as ready, irregardless of whether they are accepted by FireFox or not).
		a script will merge all *_stable tags
			for every branch, if it has a stable commit that is ready for use, we create a tag with name {branchName}_stable
	- regularly rebased on official updates

- development
	- work on the above (don't want to deal with browser without any of my customizations)
	but
	- need to test on official
	- need to remove from merging branches whose functionality was accepted by paches
			- rebase if it the accepted patch differs and I prefer the original - included in rebases above?

